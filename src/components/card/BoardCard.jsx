import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TocIcon from "@mui/icons-material/Toc";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    backgroundColor: "#fdb26c !important",
    boxShadow: 100,
    borderRadius: "0px 15px 15px !important",
    border: "1px solid",
    textTransform: "none !important",
    color: "black !important",
  },
  addTextArea: {
    border: "3px solid",
    textTransform: "none !important",
    color: "black !important",
    backgroundColor: "#fee0c4 !important",
    borderRadius: "10px !important",
    margin: "0px 0px 5px 10px !important"
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    // backgroundColor: "#FD956C !important",
    width: "100vw",
    // maxWidth: "100vw"
  },
});

export default function BoardCard(props) {
  const { board } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  const handleBoardClick = (id) => {
    navigate(`/board/${id}`);
  };
  
  const currentDate = new Date();
  
  const date = currentDate.getFullYear() 
  + '/' + (currentDate.getMonth() + 1) + 
  '/' + currentDate.getDate() + ' ' 
  + currentDate.getHours() + ':' 
  + currentDate.getMinutes() 
  + ':' + currentDate.getSeconds();

  return (
    <Box>
      <Card className={classes.card} sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontWeight: 600 }} className={classes.title} variant="h6" component="div">
            {board.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="body2">
            Created at: {date}
          </Typography>
          <Typography color="text.secondary">{board.description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              handleBoardClick(board.id);
            }}
            className={classes.addTextArea}
            size="small"
          >
            <TocIcon fontSize="medium" />
          </Button>
        </CardActions>
      </Card>

    </Box>

  );
}
