import React from 'react';
import { LucideArrowUpRight, LucideCalendar, LucideMessageSquare, LucideThumbsUp } from 'lucide-react';

export const AnswerDisplay = ({ searchResult }) => {
  if (!searchResult?.results?.items) {
    return (
      <div className="text-center py-12 text-gray-500">
        No search results found. Try a different query.
      </div>
    );
  }

  const { items } = searchResult.results;
  const { formattedTotalResults, formattedSearchTime } = searchResult.results.searchInformation;

  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="text-sm text-gray-500 mb-6">
        About {formattedTotalResults} results ({formattedSearchTime} seconds)
      </div>

      {/* Results List */}
      <div className="space-y-8">
        {items.map((result, index) => (
          <div key={index} className="group">
            {/* URL and Site Info */}
            <div className="flex items-center mb-1">
              <span className="text-xs text-gray-500 truncate max-w-xs">
                {result.displayLink}
                {result.pagemap?.metatags?.[0]?.['og:site_name'] && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs bg-gray-100 rounded text-gray-600">
                    {result.pagemap.metatags[0]['og:site_name']}
                  </span>
                )}
              </span>
            </div>

            {/* Title */}
            <a
              href={result.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xl font-medium text-blue-600 hover:underline hover:text-blue-800 mb-1"
              dangerouslySetInnerHTML={{ __html: result.htmlTitle || result.title }}
            />

            {/* Snippet */}
            <p
              className="text-gray-700 mb-2"
              dangerouslySetInnerHTML={{ __html: result.htmlSnippet || result.snippet }}
            />

            {/* Rich Preview (for Reddit, Twitter, etc.) */}
            {result.pagemap?.metatags?.[0]?.['og:image'] && (
              <div className="flex border rounded-lg overflow-hidden mt-3 max-w-2xl">
                <div className="w-48 h-32 flex-shrink-0">
                  <img
                    src={result.pagemap.metatags[0]['og:image']}
                    alt={result.pagemap.metatags[0]['og:image:alt'] || result.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.remove('w-48');
                    }}
                  />
                </div>
                <div className="p-4 flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {result.pagemap.metatags[0]['og:title'] || result.title}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {result.pagemap.metatags[0]['og:description']}
                  </p>
                  
                  {/* Reddit-specific metadata */}
                  {result.displayLink.includes('reddit.com') && (
                    <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <LucideThumbsUp className="w-3 h-3 mr-1" />
                        {result.pagemap.metatags[0]['og:description']?.match(/\d+ votes/)?.[0] || ''}
                      </span>
                      <span className="flex items-center">
                        <LucideMessageSquare className="w-3 h-3 mr-1" />
                        {result.pagemap.metatags[0]['og:description']?.match(/\d+ comments/)?.[0] || ''}
                      </span>
                      <span className="flex items-center">
                        <LucideCalendar className="w-3 h-3 mr-1" />
                        {result.snippet?.match(/([A-Za-z]{3} \d{1,2}, \d{4})/)?.[0] || ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Footer with action buttons */}
            <div className="flex items-center mt-2 space-x-4">
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                Visit page <LucideArrowUpRight className="w-4 h-4 ml-1" />
              </a>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Save
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Share
              </button>
            </div>

            {/* Divider */}
            {index < items.length - 1 && (
              <div className="border-t border-gray-200 mt-6 pt-6"></div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination would go here */}
    </div>
  );
};