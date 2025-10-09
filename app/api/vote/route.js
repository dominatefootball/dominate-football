import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { slug, optionId } = await request.json();

    // Get blog
    const getBlogRes = await fetch(
      `https://dominate-football-backend.onrender.com/api/blogs?filters[slug][$eq]=${slug}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
        }
      }
    );

    if (!getBlogRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
    }

    const blogData = await getBlogRes.json();

    if (!blogData?.data?.[0]) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const blog = blogData.data[0];

    // Calculate new votes
    const currentVotes = blog.pollVotes || { "0": 0, "1": 0, "2": 0 };
    const newVotes = {
      "0": parseInt(currentVotes["0"] || 0) + (optionId === 0 ? 1 : 0),
      "1": parseInt(currentVotes["1"] || 0) + (optionId === 1 ? 1 : 0),
      "2": parseInt(currentVotes["2"] || 0) + (optionId === 2 ? 1 : 0),
    };

    console.log('Blog documentId:', blog.documentId);
    console.log('New votes:', newVotes);

    // ✅ FIX: Use documentId instead of numeric id
    const updateRes = await fetch(
      `https://dominate-football-backend.onrender.com/api/blogs/${blog.documentId}`,
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

    console.log('PUT Status:', updateRes.status);

    if (!updateRes.ok) {
      const errorText = await updateRes.text();
      console.error('PUT Error:', errorText);
      return NextResponse.json({ error: 'Update failed', details: errorText }, { status: 500 });
    }

    const result = await updateRes.json();
    console.log('✅ Vote saved successfully!');

    return NextResponse.json({
      success: true,
      votes: newVotes,
      blogId: blog.documentId
    });

  } catch (error) {
    console.error('Vote API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
