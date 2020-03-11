import React from 'react';
import './App.css';
import UserCard from './Card'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container';


class App extends React.Component {
  state = {
    people:[],
  }

    getPeople = () =>{
      const offset = this.state.people.length;
      console.log(offset)
      let initialState = this.state.people
      fetch(`https://search.torre.co/people/_search/?&aggregate=false&offset=${offset}&size=15`, {method: "POST"})
      .then(res => res.json())
      .then(results => {
        let userData = results.results.map(person => {
          return({
            name:person.name,
            username: person.username,
            picture: person.picture,
            professionalHeadline: person.professionalHeadline,
            skillset: person.skills.slice(0, 7)
          })
        })

        userData.forEach( element => {
          element.skills = element.skillset.map(skill =>{
            return(skill.name);
          })
        })
        
        if (offset > 0) {
          userData.forEach(element => {
            initialState.push(element)
          });
          this.setState({people: initialState})
        }else{
          this.setState({people: userData})
        }
        
      })
      .catch(err => console.log(err))
    }

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

  

  render(){
    
    const people = this.state.people
    return (
      <Container maxwidth="sm">
        <AppBar color="primary" position="static">
          <Toolbar>
            <TypoGraphy variant="title"
              color="inherit"
            >
              Recomended Jobs
           </TypoGraphy>
          </Toolbar>
        </AppBar>
        <Grid container spacing={1} style={{marginTop : "5px"}}>
          {
            people.map(person => {
              return(
                <Grid item xs={4}>
                  <Paper >
                    <UserCard
                        name = {person.name}
                        username = {person.username}
                        picture = {person.picture}
                        headline = {person.professionalHeadline}
                        skills = {person.skills}
                    />
                  </Paper>
                </Grid>
              )
            })
          }
          
      </Grid>

      </Container>
    );
  }
  
}

export default App;