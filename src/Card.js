import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import ExtendedCard from './ExtendedCard.js';




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserCard(props) {
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


    return(
      <React.Fragment>
        <Card >
      <CardActionArea style={{"padding-bottom": "20px"}} onClick={handleClickOpen}>
        <CardMedia
          component="img"
          alt="Torre User"
          height="250"
          image={props.picture}
          title="Torre User"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.headline.length > 40 ? props.headline.substring(0, 40) + "..." : props.headline}
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

    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            </IconButton>
            <Typography variant="h6">
              {props.name}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              X
            </Button>
          </Toolbar>
        </AppBar>
        <ExtendedCard
          name = {props.name}
          username = {props.username}
          picture = {props.picture}
          headline = {props.professionalHeadline}
          skills = {props.skills}
      />
      </Dialog>
      </React.Fragment>
    );
  }
