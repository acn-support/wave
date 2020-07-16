export const fixikiStyle = `
.fixiki {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  background-image: url("/images/wave.acn.group/backgrounds/create-wave-code.png");
  background-attachment: fixed;
  background-position: left top;
  background-size: cover;
  text-align: center;
}
.bar {
  cursor: default;
  box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5),
    1px 1px 5px rgba(255, 255, 255, 1);
  background-color: #ffe800;
  background: repeating-linear-gradient(
    45deg,
    #ffe800,
    #ffe800 0.5rem,
    #222 0.5rem,
    #222 1rem
  );
  min-height: 2.5rem;
  color: red;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 200%;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff,
    0 0 20px #49ff18, -3px -21px 4px rgba(28, 11, 68, 0);
  text-transform: uppercase;
}

.bar::selection {
  color: grey;
}

#nolik {
  user-select: none;
  grid-area: Fm / Em / E / E;
  margin: auto;
  padding: 1rem;
  border: 1px solid red;
}

.attention {
  grid-area: Cm / Em / Dm / E;
}

.message {
  grid-area: D / Em / C / E ;
}

.secret {
  cursor: help;
}

.secret::selection {
  color: red;
}`;

export const notFoundStyle = `
.notFound {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;  
  background-image: linear-gradient(-225deg, #1a1a1a, #343434);

}
#simka {
  user-select: none;
  grid-area: Em / Em / E / E;
  margin: auto;
  z-index: 21;
  border: 1px solid red;
  max-height: 16rem;
}
.notFoundTitle {
  --x-shadow: 0;
  --y-shadow: 0;
  --x: 50%;
  --y: 50%;
  grid-area: Dm / Em / D / E;
  border: 1px solid yellow;
  font-size: 15rem;
  transition: all 0.2s ease;
  text-align: center;
  margin: 0;
}
.notFoundTitle:hover {
  transition: all 0.2s ease;
  text-shadow: var(--x-shadow) var(--y-shadow) 10px #1a1a1a;
}
.notFoundTitle p {
  background-image: radial-gradient(
    circle closest-side,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  background-position: var(--x) var(--y);
  background-repeat: no-repeat;
  text-shadow: none;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.1s ease;  
}
.notFoundSubtitle {
  grid-area: Cm / Em / Cm / E;
  border: 1px solid maroon;
  color: #25f193;
  text-transform: uppercase;
  letter-spacing: 5pt;
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  // margin: auto;

}
.notFoundButton {
  grid-area: D / Em / C / E ;
  border: none;
  text-decoration: none;
  border-radius: 99999px;
  background-image: linear-gradient(to top, #32c983, #25f193);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2),
    inset 0px -2px 5px 0px rgba(0, 0, 0, 0.2);
  text-shadow: 0px 1px #343434;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1.5pt;
  font-size: 0.8rem;
  font-weight: 700;
  transition: ease-out 0.2s all;
  text-align: center;
  margin: auto;
  padding: 8px;
}
.notFoundButton:hover {
  text-shadow: 0px 1px 1px #343434;
  transform: translateY(-5px);
  box-shadow: 0px 4px 15px 2px rgba(0, 0, 0, 0.1),
    inset 0px -3px 7px 0px rgba(0, 0, 0, 0.2);
  transition: ease-out 0.2s all;
}

`