import Link from "next/link";

export default function custom4040() {
  return (
    <h1>
      올바르지 않은 주소입니다.{" "}
      <Link className="text-red" href="/">
        돌아가기
      </Link>
    </h1>
  );
}
