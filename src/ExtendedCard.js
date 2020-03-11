import React from "react";
import CardMedia from '@material-ui/core/CardMedia';
import OppCard from './OppCard.js';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

class ExtendedCard extends React.Component {
  state = {
    user:{},
    opportunities:[]
  }

    getOpportunityData = () =>{
      const offset = this.state.opportunities.length;
      console.log(offset)
      let initialState = this.state.opportunities
      fetch(`https://search.torre.co/opportunities/_search/?&aggregate=false&offset=${offset}&size=500`, {method: "POST"})
      .then(res => res.json())
      .then(results => {
        let data = results.results.filter(opportunity => opportunity.organizations[0])
        let opportunityData = data.map(opportunity => {
          return({
            name: opportunity.objective,
            org: opportunity.organizations[0].name,
            picture: opportunity.organizations[0].picture,
            skillset: opportunity.skills
          })
        })
        
        console.log(opportunityData);
        opportunityData.forEach( element => {
          element.skills = element.skillset.map(skill =>{
            return(skill.name);
          })
        })
        

        const {skills} = this.props;

        const opportunities = opportunityData.filter( element => element.skills.includes(skills[0]) || element.skills.includes(skills[1]) || element.skills.includes(skills[2]))
        console.log(opportunities)  
        if (offset > 0) {
          opportunities.forEach(element => {
            initialState.push(element)
          });

          this.setState({opportunities: initialState})
        }else{
          this.setState({opportunities})
        }

      })
      .catch(err => console.log(err))
        
    }

  // getBioData = () =>{
  //   fetch(`https://bio.torre.co/api/bios/${this.props.username}`, {"method": 'GET', "mode":'no-cors'})
  //     .then(res => res.json())
  //     .then(results => {
  //       console.log(results)
  //     })  
  // }


  componentDidMount() {
    if (this.state.opportunities.length === 0) this.getOpportunityData();
  }

  render (){
    const opportunities = this.state.opportunities
    return(
       <React.Fragment>
         <CardMedia
          component="img"
          alt="Torre User"
          height="500"
          image={this.props.picture}
          title="Torre User"
        />
        <Grid container spacing={3} style={{marginTop : "5px", backgroundColor: "#282c34"}}>
          {
            opportunities.map(opp => {
              return(
                <Grid item xs={4}>
                  <Paper >
                    <OppCard
                        name = {opp.name}
                        org = {opp.org}
                        picture = {opp.picture}
                        skills = {opp.skills}
                    />
                  </Paper>
                </Grid>
              )
            })
          }
          
      </Grid>
       </React.Fragment>
    );
  }
}

export default ExtendedCard;