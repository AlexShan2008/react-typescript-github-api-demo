import { FooterWrapper } from "./footer.styled";
import { GithubOutlined } from "@ant-design/icons";
import Link from "next/link";

export const Footer = () => {
  return (
    <FooterWrapper>
      <Link href="https://github.com/AlexShan2008" className="github-icon">
        <GithubOutlined />
      </Link>
    </FooterWrapper>
  );
};
