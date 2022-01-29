import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BoardView from "../../components/dnd/BoardView"
// redux actions
import { getBoard } from "../../store/actions/board";
import { moveCatalog } from "../../store/actions/catalog";

const useStyles = makeStyles({
  root: {
    margin: "20px"
  }
})

const Board = (props) => {
  const { board } = props;
  const classes = useStyles();
  const boardId = window.location.pathname.split("/")[2];

  // fetch again based on situations
  useEffect(() => {
    if (boardId != null) {
      props.getBoard(boardId)
    }
  }, [boardId, props.renderCreateAdd])

  return (
    <div className={classes.root}>
      {
        board != null && <div>
          <h1>{board.title}</h1>
          <div><em>{board.description}</em></div>
          <br></br>
          <div><em>Created at: {board.createdDate}</em></div>
          <section>
            <BoardView boards={board.catalogs} handleMove={props.moveCatalog} />
          </section>
        </div>
      }
    </div>
  )
}

const mapStateToProps = ({ board, card }) => ({
  board: board.board.data,
  renderCreateAdd: card.renderCreateAdd
})

const mapDispatchToProps = {
  getBoard,
  moveCatalog
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);