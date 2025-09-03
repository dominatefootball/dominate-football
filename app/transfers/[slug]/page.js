import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import PageWrapper from '../../components/pagewrapper';
import PollWrapper from '../../components/pollwrapper'; // ✅ uses Strapi-backed votes

async function fetchBlogBySlug(slug) {
  const url = `${process.env.STRAPI_API_URL}/blogs?filters[slug][$eq]=${slug}&populate[body][populate]=*&populate[image]=true`;

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    const errText = await res.text();
    // console.error('Strapi error:', errText);
    throw new Error(`Failed to fetch blog: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.data[0];
}


export default async function TransferBlogDetail({ params }) {
  const { slug } = await params;          // ✅ Must await params
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    return (
      <PageWrapper>
        <Header />
        <div className="text-center text-white p-10">Blog not found.</div>
        <Footer />
      </PageWrapper>
    );
  }

  const { title, author, publishedDate, content, image } = blog;
  const imageUrl = image?.url ? `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_BASE_URL}${image.url}` : null;


  return (
    <PageWrapper>
      <Header />
      <main className="p-6 md:p-10 min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">

          {/* Left – image + content */}
          <div className="w-full md:w-2/3 space-y-0 md:space-y-6">
            {imageUrl && (
              <>
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-auto rounded"
                />

                {blog.imgCredit && (
                  <div className="bg-white bg-opacity-70 shadow-lg rounded-lg px-2 py-0.5 md:px-4 md:py-1 mb-2 md:mb-4">
                    <p className="text-[10px] md:text-sm text-gray-950 italic">
                      Image credit: {blog.imgCredit}
                    </p>
                  </div>
                )}

                {/* LED Marquee Effect - Mobile Only */}
                <div className="block md:hidden -mb-1">
                  <div className="bg-black rounded-lg py-0.5 px-2 overflow-hidden">
                    <div className="led-marquee">
                      <div className="led-text">
                        ⚡PLEASE READ OUR BLOG CONTENT BEFORE YOU VOTE ⚡
                      </div>
                    </div>
                  </div>
                </div>

              </>
            )}

            {/* Mobile Poll - appears after image, hidden on desktop, smaller size, no margins */}
            <div className="block md:hidden">
              <div className="transform scale-75 origin-center -mt-8 -mb-10">
                <PollWrapper slug={slug} />
              </div>
            </div>



            {/* Blog content container */}
            <div className="bg-white bg-opacity-95 shadow-lg rounded-lg p-6">
              <h1 className="text-3xl font-bold mb-4 text-gray-800">{title}</h1>
              <p className="text-sm text-gray-600 mb-6">
                By {author || 'Unknown'} on{' '}
                {publishedDate ? new Date(publishedDate).toDateString() : 'Unknown Date'}
              </p>

              <div className="text-gray-800 space-y-6">

                {/* ORIGINAL content */}
                {blog.content && Array.isArray(blog.content) && (
                  <div className="prose prose-lg max-w-none leading-relaxed mb-8">
                    {blog.content.map((para, idx) => (
                      <p
                        key={`original-${idx}`}
                        className="mb-4 leading-relaxed whitespace-pre-wrap"
                      >
                        {para.children?.map((child, i) => {
                          const classList = [];
                          if (child.bold) classList.push('font-bold');
                          if (child.underline) classList.push('underline');

                          const textWithBreaks = child.text
                            .split('\n')
                            .flatMap((line, index, array) =>
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
                )}

                {/* Dynamic-zone content */}
                {blog.body?.map((block, idx) => {
                  switch (block.__component) {
                    /* ───────────── text block ───────────── */
                    case 'components.text-block': {
                      let htmlContent = '';

                      if (typeof block.text === 'string') {
                        htmlContent = block.text;
                      } else if (Array.isArray(block.text)) {
                        htmlContent = block.text
                          .map(para => {
                            if (!para.children) return '';
                            return `<p>${para.children
                              .map(child => {
                                let text = child.text || '';
                                if (child.bold) text = `<strong>${text}</strong>`;
                                if (child.underline) text = `<u>${text}</u>`;
                                if (child.italic) text = `<em>${text}</em>`;
                                return text.replace(/\\n/g, '<br>');
                              })
                              .join('')}</p>`;
                          })
                          .join('');
                      } else {
                        htmlContent = String(block.text || '');
                      }

                      return (
                        <div
                          key={`dynamic-${idx}`}
                          className="prose prose-lg max-w-none leading-relaxed whitespace-pre-wrap"
                          style={{ whiteSpace: 'pre-wrap' }}
                          dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                      );
                    }

                    /* ───────────── image block ───────────── */
                    case 'components.image-block': {
                      const imageData = Array.isArray(block.image) ? block.image[0] : block.image;
                      const blockImageUrl = imageData?.url
                        ? `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_BASE_URL}${imageData.url}`
                        : null;


                      return blockImageUrl ? (
                        <figure key={`dynamic-${idx}`} className="my-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <img
                              src={blockImageUrl}
                              alt={imageData.alternativeText || block.caption || 'Blog image'}
                              className="w-5/6 max-w-xl h-auto rounded shadow-md mx-auto"
                            />
                          </div>
                          {block.caption && (
                            <figcaption className="mt-2 text-sm text-gray-500 italic text-center">
                              {block.caption}
                            </figcaption>
                          )}
                        </figure>
                      ) : null;
                    }

                    default:
                      return null; // unknown component
                  }
                })}
              </div>
            </div>
          </div>

          {/* Right – Desktop Poll (hidden on mobile) */}
          <div className="hidden md:block w-full md:w-1/3">
            <PollWrapper slug={slug} />
          </div>
        </div>
      </main>
      <Footer />
    </PageWrapper>
  );
}
