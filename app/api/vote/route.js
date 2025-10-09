import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { slug, optionId } = await request.json();

    console.log('=== VOTE API START ===');
    console.log('Slug:', slug);
    console.log('Option:', optionId);
    console.log('Token exists:', !!process.env.STRAPI_API_TOKEN);
    console.log('Token preview:', process.env.STRAPI_API_TOKEN?.substring(0, 20) + '...');

    // Get blog
    const getBlogUrl = `https://dominate-football-backend.onrender.com/api/blogs?filters[slug][$eq]=${slug}`;
    console.log('GET URL:', getBlogUrl);

    const getBlogRes = await fetch(getBlogUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
      }
    });

    console.log('GET Status:', getBlogRes.status);

    if (!getBlogRes.ok) {
      const errorText = await getBlogRes.text();
      console.error('GET Error:', errorText);
      return NextResponse.json({ error: 'Fetch failed', details: errorText }, { status: 500 });
    }

    const blogData = await getBlogRes.json();
    console.log('Blog data:', JSON.stringify(blogData, null, 2));

    if (!blogData?.data?.[0]) {
      console.error('No blog found!');
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const blog = blogData.data[0];
    console.log('Blog ID:', blog.id);
    console.log('Current pollVotes:', blog.pollVotes);

    // Calculate new votes
    const currentVotes = blog.pollVotes || { "0": 0, "1": 0, "2": 0 };
    const newVotes = {
      "0": parseInt(currentVotes["0"] || 0) + (optionId === 0 ? 1 : 0),
      "1": parseInt(currentVotes["1"] || 0) + (optionId === 1 ? 1 : 0),
      "2": parseInt(currentVotes["2"] || 0) + (optionId === 2 ? 1 : 0),
    };

    console.log('New votes to save:', newVotes);

    // Update
    const updateUrl = `https://dominate-football-backend.onrender.com/api/blogs/${blog.id}`;
    const updateBody = {
      data: {
        pollVotes: newVotes
      }
    };

    console.log('PUT URL:', updateUrl);
    console.log('PUT Body:', JSON.stringify(updateBody, null, 2));

    const updateRes = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
      },
      body: JSON.stringify(updateBody)
    });

    console.log('PUT Status:', updateRes.status);
    console.log('PUT StatusText:', updateRes.statusText);

    const responseText = await updateRes.text();
    console.log('PUT Response:', responseText);

    if (!updateRes.ok) {
      console.error('PUT FAILED!');
      return NextResponse.json({ 
        error: 'Update failed',
        status: updateRes.status,
        response: responseText
      }, { status: 500 });
    }

    console.log('=== VOTE API SUCCESS ===');

    return NextResponse.json({
      success: true,
      votes: newVotes,
      blogId: blog.id
    });

  } catch (error) {
    console.error('=== VOTE API ERROR ===');
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
