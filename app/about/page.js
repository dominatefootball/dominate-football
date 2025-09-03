import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import PageWrapper from '../components/pagewrapper';

async function fetchAboutBlog() {
  const res = await fetch(`${process.env.STRAPI_API_URL}/blogs?populate=*`, {
    headers: {
      'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }

  const json = await res.json();
  const aboutPost = json.data.find(blog => blog.title === 'About this site');
  return aboutPost;
}

export default async function AboutPage() {
  const blog = await fetchAboutBlog();

  if (!blog) {
    return (
      <PageWrapper>
        <Header />
        <div className="text-center text-white p-10">About blog not found.</div>
        <Footer />
      </PageWrapper>
    );
  }

  const { title, author, publishedDate, content } = blog;

  return (
    <PageWrapper>
      <Header />
      <main className="min-h-screen p-10">
        <div className="bg-white bg-opacity-95 rounded-lg shadow-md p-6 max-w-3xl mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600 mb-6">
            By {author || 'Unknown'} on {publishedDate ? new Date(publishedDate).toDateString() : 'Unknown Date'}
          </p>

          {/* Rich Text Rendering */}
          <div className="text-gray-800 space-y-4">
            {Array.isArray(content) &&
              content.map((para, idx) => (
                <p key={idx} className="mb-4 leading-relaxed">
                  {para.children.map((child, i) => {
                    const classList = [];
                    if (child.bold) classList.push('font-bold');
                    if (child.underline) classList.push('underline');

                    const textWithBreaks = child.text.split('\n').flatMap((line, index, array) =>
                      index < array.length - 1 ? [line, <br key={index} />] : [line]
                    );

                    return (
                      <span key={i} className={classList.join(' ')}>
                        {textWithBreaks}
                      </span>
                    );
                  })}
                </p>
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </PageWrapper>
  );
}
