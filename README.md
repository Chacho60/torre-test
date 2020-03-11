# Torre Test

------

## Overview

This a react app for torre showcasing some skills. It was made using `create-react-app` and only material-ui was used aside from react.

The basic reasoning of this little site is to be an index with data gethered from torre, this index matches the skills of the users with jobs needing said skills.

## **Infinite Scroll**

Infinite scroll was implemented using javascript event listeners, on `componentDidMount()`, it listens  for the `scroll` event on browser and checks if it is at the bottom of the page. If that's true it fires up `getPeople` which adds another 15 cards into the App

```
handleScroll = (e) =>{
    // Detect when scrolled to bottom
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      this.getPeople();
    }
  }

  componentDidMount() {

    if (this.state.people.length === 0) this.getPeople(); 
    window.addEventListener("scroll", this.handleScroll)
    
  }

  componentWillUnmount(){
    window.removeEventListener("scroll");
  }
```

## Useful Links

This project is hosted in github as: https://github.com/Chacho60/tore-test

It is also deployed on netlify for convenience: https://amazing-wiles-e9ff25.netlify.com/
