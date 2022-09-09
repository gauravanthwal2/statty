import styles from "./Navbar.module.css";
import React from "react";
import { Container } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const Navbar = () => {
  return (
    <nav className="py-1 ">
      <Head>
        <noscript>You have not enabled JavaScript on your browser.</noscript>
      </Head>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Link href={"/"}>
              <Image
                src="/assets/statty.png"
                alt="Publicis Sapient"
                width={110}
                height={50}
                className={styles.logo}
              />
            </Link>
          </div>
          <div className="nav-links">
            <Link href={"/"}>Participant</Link>
            <Link href={"/allTrainings"}>Training</Link>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
