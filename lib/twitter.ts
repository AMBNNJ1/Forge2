export interface VerifyTweetOptions {
  tweetId: string;
  username: string;
}

export async function verifyTweet(
  { tweetId, username }: VerifyTweetOptions,
  bearerToken: string
): Promise<boolean> {
  const url = `https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id&user.fields=username`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (!res.ok) {
    return false;
  }

  const data = await res.json();
  const authorId = data?.includes?.users?.[0]?.username?.toLowerCase();
  return authorId === username.toLowerCase();
}
