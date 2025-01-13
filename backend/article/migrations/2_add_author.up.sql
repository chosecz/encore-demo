ALTER TABLE article
ADD COLUMN author_id UUID;

-- Update existing articles to have a default author if needed
-- This assumes you want to set them to NULL for now
UPDATE article SET author_id = '503e9fc7-4327-4382-bfb5-447de09daba5';

-- Make author_id required for future articles
ALTER TABLE article
ALTER COLUMN author_id SET NOT NULL;
