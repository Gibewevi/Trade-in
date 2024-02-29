'use client'
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Become() {
  // Références pour accéder à tous les éléments span de manière séquentielle
  const wordsRef = useRef([]);
  // Références pour les chiffres
  const chapitresRef = useRef(null);
  const coursRef = useRef(null);
  const heuresRef = useRef(null);

  // Phrases divisées en mots pour l'animation, organisées par ligne
  const lines = [
    ["De", "novice", "à", "expert", "en", "trading."], // Première ligne
    ["une seule formation", "uniquement."] // Deuxième ligne
  ];

  useEffect(() => {
    gsap.to(wordsRef.current, {
      opacity: 1,
      y: 12,
      duration: 0.5,
      stagger: 0.2, // Décalage de 0.2 secondes entre chaque animation
      ease: "power3.out",
    });
  }, []);
  useEffect(() => {
    // Animation des mots
    gsap.to(wordsRef.current, {
      opacity: 1,
      y: 12,
      duration: 0.2,
      stagger: 0.25,
      ease: "power3.out",
    });

    // Animation des chiffres
    const animateNumber = (ref, endValue) => {
      gsap.fromTo(ref.current,
        { innerHTML: 0 },
        {
          innerHTML: endValue,
          roundProps: "innerHTML",
          ease: "power1.out",
          duration: 3.5,
          onUpdate: function () {
            ref.current.textContent = this.targets()[0].innerHTML;
          }
        }
      );
    };

    // Appel de la fonction d'animation pour chaque chiffre
    animateNumber(chapitresRef, 7);
    animateNumber(coursRef, 66);
    animateNumber(heuresRef, 91);

  }, []);


  return (
    <div className="w-full h-screen bg-[#150c21] pt-[190px]">
      <div className="w-full">
        <div className="flex flex-col gap-y-[40px] justify-center items-center mx-auto max-w-2xl h-[200px]">
          {/* TITLE */}
          <div className="flex flex-col justify-center items-center">
            {/* Itération sur chaque ligne */}
            {lines.map((line, lineIndex) => (
              <div key={lineIndex} className="flex justify-center items-center">
                {/* Itération sur chaque mot d'une ligne */}
                {line.map((word, wordIndex) => (
                  <span
                    key={`${lineIndex}-${wordIndex}`}
                    className="text-4xl font-extrabold tracking-wider inline-block mx-1 opacity-0"
                    ref={el => wordsRef.current[lineIndex * lines[0].length + wordIndex] = el} // Stockage référence
                  >
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
          {/* SPEECH */}
          <div className="flex justify-center items-center">
            <span className="text-lg font-light text-center">Rejoins BitLearn et <span className="font-bold">accède à vie</span> à une formation complète et <span className="font-bold">facile d'accès</span> en trading avec 66 cours conçus pour que tu puisses <span className="font-bold">devenir indépendant</span>.</span>
          </div>
          {/* LESSONS */}
          <div className="flex flex-row w-full h-[100px]">
            <div className="flex flex-col justify-center items-center w-full border-r-[0.1em] border-[#2D2538]">
              <span ref={chapitresRef} className="text-6xl font-semibold">7</span>
              <span className="text-lg">chapitres</span>
            </div>
            <div className="flex flex-col justify-center items-center w-full border-r-[0.1em] border-[#2D2538]">
              <span ref={coursRef} className="text-6xl font-semibold">66</span>
              <span className="text-lg">cours</span>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <span ref={heuresRef} className="text-6xl font-semibold">91</span>
              <span className="text-lg">heures de vidéos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}