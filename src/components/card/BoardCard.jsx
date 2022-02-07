import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    border: "1px solid blue",
    borderRadius: "20px !important",
  },
});

export default function BoardCard(props) {
  const { board } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  const handleBoardClick = (id) => {
    navigate(`/board/${id}`);
  };

  return (
    <Card className={classes.card} sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {board.title}
        </Typography>
        <Typography color="text.secondary">{board.description}</Typography>
        <Typography sx={{ mb: 1.5 }} variant="body2">
          Created at: {board.createdDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            handleBoardClick(board.id);
          }}
          size="small"
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
