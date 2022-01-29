import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react"
import { connect } from "react-redux"
import BoardCard from "../../components/card/BoardCard";
import Board from "../../components/dnd/BoardView";
import { getWorkspace } from "../../store/actions/workspace"

const useStyles = makeStyles({
  root: {
    margin: 30
  },
  boardContainer: {
    width: "50%",
    margin: "20px auto"
  }
});

const Workspace = (props) => {
  const { workspace, status } = props;

  const classes = useStyles();

  useEffect(() => {
    props.getWorkspace("email@gmail.com");
  }, [])

  const handleBoardClick = (id) => {
    console.log(id)
  }

  return (
    <div className={classes.root}>
      {
        status === 200 && <div>
          <h2>{workspace.email}'s workspace</h2>
          <section>
            <h3>Your boards</h3>
            <div>
              {
                workspace.boards.map((board, key) =>
                  <div key={key} className={classes.boardContainer}>
                    <BoardCard board={board} />
                  </div>
                )}
            </div>
          </section>
        </div>
      }
    </div>
  )
}


const mapStateToProps = ({ workspace }) => ({
  workspace: workspace.workspace.data,
  status: workspace.workspace.status
})

const mapDispatchToProps = {
  getWorkspace
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);