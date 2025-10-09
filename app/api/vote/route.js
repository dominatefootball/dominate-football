import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { slug, optionId } = await request.json();

    // 1. Get the blog by slug
    const getBlog = await fetch(
      `${process.env.STRAPI_API_URL}/api/blogs?filters[slug][$eq]=${slug}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
        }
      }
    );

    const blogData = await getBlog.json();
    const blog = blogData.data[0];

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // 2. Calculate new votes
    const currentVotes = blog.pollVotes || { "0": 0, "1": 0, "2": 0 };
    const newVotes = {
      "0": parseInt(currentVotes["0"] || 0) + (optionId === 0 ? 1 : 0),
      "1": parseInt(currentVotes["1"] || 0) + (optionId === 1 ? 1 : 0),
      "2": parseInt(currentVotes["2"] || 0) + (optionId === 2 ? 1 : 0),
    };

    // 3. Update using numeric ID
    const updateRes = await fetch(
      `${process.env.STRAPI_API_URL}/api/blogs/${blog.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
        },
        body: JSON.stringify({
          data: {
            pollVotes: newVotes
          }
        })
      }
    );

    if (!updateRes.ok) {
      const error = await updateRes.text();
      console.error('Update failed:', error);
      return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }

    const result = await updateRes.json();

    return NextResponse.json({
      success: true,
      votes: newVotes,
      blogId: blog.id
    });

  } catch (error) {
    console.error('Vote API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
