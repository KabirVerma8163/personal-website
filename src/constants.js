export const indexPage = {}  // Empty object declaration first
{
  indexPage.leftColor = "#000"
  indexPage.middleColor = "#fff"
  indexPage.rightColor = indexPage.leftColor
  indexPage.offset = 60
  indexPage.dividerMargin = 2.5

  indexPage.bgGradient = `background: linear-gradient( 90deg,
    ${indexPage.leftColor} ${indexPage.offset - indexPage.dividerMargin}%, 

    ${indexPage.rightColor} ${indexPage.offset + indexPage.dividerMargin}%
  );`

  indexPage.leftTextColor = "color: ;"
  indexPage.rightTextColor = "color: #;"
}

// will add more constants somewhere here :skull:

export const zigZag = {}
{
  zigZag.hoverColor = ""
}

export const navbar = {}
{
  navbar.bgColor = ""
  navbar.textColor = ""
  navbar.hoverColor = "#6e6ed7" // gotta be changed in the scss
  navbar.sourceImage = "https://via.placeholder.com/150"
}


export const footer = {} // Footer
{
  footer.trasitionColor = "background: "
}

export const waveProperties = { // Wave
  waveBackgroundColor: "background: #1e1e1e;",
  // opacity: 0.5,
  colors: ['red', 'yellow', "orange", 'blue'],
  waveSpeed: 0.15
}


// $left-color: #34495E;
// $middle-color: #86A8E7; 
// $right-color: #86A8E7;

// $left-color: #46A7B9;
// $middle-color: #5E4DBB; 
// $right-color: #36558E;

// $left-color: #173254;
// $middle-color: #1B1754; 
// $right-color: #173254;