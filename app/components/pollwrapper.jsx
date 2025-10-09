'use client';
import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Lightbulb, AlertCircle } from 'lucide-react';

// NEW (remove /api/ since env already has it):
const API_BASE = 'https://dominate-football-backend.onrender.com/blogs';



const options = [
  { label: 'Good', icon: <ThumbsUp className="text-green-500" />, id: 0, color: 'bg-green-400' },
  { label: 'Bad', icon: <ThumbsDown className="text-red-500" />, id: 1, color: 'bg-red-400' },
  { label: 'Preferred more Quality / Others', icon: <Lightbulb className="text-orange-500" />, id: 2, color: 'bg-orange-400' },
];

export default function PollWrapper({ slug }) {
  console.log('🚀 PollWrapper mounted with slug:', slug);

  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [blogDocumentId, setBlogDocumentId] = useState(null); // Changed from blogId

  // Fetch poll data using collection endpoint with slug filter
  const fetchPollData = async () => {
    console.log('🔄 fetchPollData() -> GET collection with slug filter:', slug);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}?filters[slug][$eq]=${slug}&populate=*`);
      console.log('← GET status:', res.status);

      if (!res.ok) throw new Error(`GET failed: ${res.status}`);

      const data = await res.json();
      console.log('← GET response JSON:', data);

      const blog = data.data[0];
      if (!blog) {
        throw new Error('Blog not found with slug: ' + slug);
      }

      // Store the blog documentId for updates (Strapi v5)
      setBlogDocumentId(blog.documentId);
      console.log('↳ Found blog with documentId:', blog.documentId);

      // Direct access to pollVotes (no attributes in Strapi v5)
      const backendVotes = blog.pollVotes || { "0": 0, "1": 0, "2": 0 };
      console.log('↳ backendVotes:', backendVotes);

      setVotes({
        0: parseInt(backendVotes["0"] || 0, 10),
        1: parseInt(backendVotes["1"] || 0, 10),
        2: parseInt(backendVotes["2"] || 0, 10),
      });
    } catch (err) {
      console.error('❌ Error in fetchPollData:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      // Check localStorage for user's vote status
      const voted = localStorage.getItem(`pollVoted-${slug}`);
      const userVoteData = localStorage.getItem(`pollVote-${slug}`);

      if (voted) {
        setHasVoted(true);
        if (userVoteData) {
          setUserVote(parseInt(userVoteData));
        }
      }

      fetchPollData();
    }
  }, [slug]);

  // Handle voting using standard UPDATE endpoint with documentId
  const handleVote = async (optionId) => {
    if (hasVoted || submitting || !blogDocumentId) return;

    console.log('🗳️ Frontend: Starting vote for option', optionId);
    console.log('🗳️ Frontend: Using blogDocumentId', blogDocumentId);

    setSubmitting(true);
    setError(null);

    try {
      const newVotes = {
        "0": votes[0] + (optionId === 0 ? 1 : 0),
        "1": votes[1] + (optionId === 1 ? 1 : 0),
        "2": votes[2] + (optionId === 2 ? 1 : 0),
      };

      console.log('🗳️ Frontend: New votes to send:', newVotes);

      // Use standard UPDATE endpoint with documentId (Strapi v5)
      const res = await fetch(`${API_BASE}/${blogDocumentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            pollVotes: newVotes
          }
        }),
      });

      console.log('🗳️ Frontend: Response status:', res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('🗳️ Frontend: Error response:', errorText);
        throw new Error(`Vote failed: ${res.status} - ${errorText}`);
      }

      const responseData = await res.json();
      console.log('🗳️ Frontend: Success response:', responseData);

      // Update local state
      setVotes({
        0: parseInt(newVotes["0"], 10),
        1: parseInt(newVotes["1"], 10),
        2: parseInt(newVotes["2"], 10),
      });

      setHasVoted(true);
      setUserVote(optionId);
      localStorage.setItem(`pollVoted-${slug}`, 'true');
      localStorage.setItem(`pollVote-${slug}`, optionId.toString());

      console.log('✅ Frontend: Vote saved successfully!');

    } catch (err) {
      console.error('❌ Frontend: Voting error:', err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };



  const totalVotes = Object.values(votes).reduce((sum, v) => sum + v, 0);

  const renderProgressBar = (optionId) => {
    const percent = totalVotes > 0 ? Math.round((votes[optionId] / totalVotes) * 100) : 0;
    const option = options.find(opt => opt.id === optionId);

    return (
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className={`h-2 rounded-full ${option.color} transition-all duration-300 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 text-red-600 mb-4">
          <AlertCircle size={20} />
          <span className="font-medium">Error loading poll</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchPollData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          What do you think of this signing?
        </h2>
      </div>

      <div className="space-y-4">
        {options.map(({ label, icon, id }) => {
          const percent = totalVotes > 0 ? Math.round((votes[id] / totalVotes) * 100) : 0;
          const voteCount = votes[id] || 0;
          const isUserVote = userVote === id;

          return (
            <div key={id} className="relative">
              <button
                onClick={() => handleVote(id)}
                disabled={hasVoted || submitting || !blogDocumentId} // Updated condition
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200 ${hasVoted
                  ? isUserVote
                    ? 'bg-blue-50 border-blue-200 cursor-default'
                    : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-70'
                  : 'hover:bg-gray-50 hover:border-gray-300 cursor-pointer'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-gray-800 font-medium">{label}</span>
                  {isUserVote && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Your vote
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-700">
                    {percent}%
                  </span>
                  {/*<span className="text-xs text-gray-500">
                    ({voteCount} votes)
                  </span>*/}
                </div>
              </button>
              {totalVotes > 0 && renderProgressBar(id)}
            </div>
          );
        })}
      </div>

      {submitting && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
          <span className="ml-2 text-sm text-gray-600">Submitting vote...</span>
        </div>
      )}

      {hasVoted && !submitting && (
        <p className="text-sm text-gray-600 text-center">Thanks for voting!</p>
      )}
    </div>

  );
}
