import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';


export default function OppCard(props) {

    return(
      <React.Fragment>
        <Card >
      <CardActionArea style={{"padding-bottom": "20px"}}>
        <CardMedia
          component="img"
          alt="Torre User"
          height="250"
          image={props.picture}
          title="Torre User"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.org}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.name}
          </Typography>
        </CardContent>
        {props.skills.map(skill => {
          return(
            <Chip
              label={skill}
              clickable
              color="primary"
            />
          )
        })}
      </CardActionArea>

    </Card>
      </React.Fragment>
    );
  }
