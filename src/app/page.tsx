import Link from "next/link";
import { db } from "~/server/db";

const mockUrls = [
  "https://utfs.io/f/ced1094d-370a-4dd1-b997-b8f4d0c25b0f-1v7r1m.jpg",
  "https://utfs.io/f/6003c264-6aaa-483d-ba56-4878e5f1e4a3-cz0jd1.jpg",
  "https://utfs.io/f/bd564369-0f0b-4e3d-b48c-96967ddaa3bf-cz0jd2.jpg",
  "https://utfs.io/f/516b39c2-4d9c-4d4f-8ce8-9c9fc673df3a-s3e1ws.jpg",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}

        {[...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
