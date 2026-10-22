'use client';

import Image from "next/image";
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

const SLIDES = ["/imagens/slide1.png", "/imagens/slide2.png", "/imagens/slide3.png"];

export default function Home() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <main className="container py-4">
      <div id="carouselStackedIndicators" className="carousel slide mx-auto" style={{ maxWidth: "1600px" }}>

        <div className="carousel-inner rounded-4 shadow-sm" style={{ height: "450px", marginTop: "100px" }}>
          {SLIDES.map((src, index) => (
            <div key={src} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <Image
                src={src}
                className="d-block w-100 h-100"
                alt={`Slide ${index + 1}`}
                width={1600}
                height={260}
                style={{ objectFit: "cover" }}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <div>
            <button className="btn btn-outline-dark btn-sm me-1 py-0 px-2" type="button" data-bs-target="#carouselStackedIndicators" data-bs-slide="prev">‹</button>
            <button className="btn btn-outline-dark btn-sm py-0 px-2" type="button" data-bs-target="#carouselStackedIndicators" data-bs-slide="next">›</button>
          </div>

          <div className="carousel-indicators position-relative m-0">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselStackedIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.principal}>

        <h1 className={styles.title}>
          Seja Bem-Vindo à Cabin 3!
        </h1>
        <p>
          Aqui na Cabin 3, acreditamos que a música em formato analógico possui uma alma e uma nostalgia únicas. Este painel foi desenvolvido especialmente para organizar nossos álbuns, gerenciar o estoque de grandes clássicos e lançamentos modernos em LP, e garantir que cada disco encontre o seu ouvinte ideal com praticidade e eficiência.

        </p>

        <div className="d-flex mt-4">
          <button type="button" className={styles.btnacervo}><a href="../acervo/" className="text-white text-decoration-none">Ver Acervo</a></button>
        </div>

      </div>
    </main >
  );
}