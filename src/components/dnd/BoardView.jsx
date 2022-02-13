import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const useStyles = makeStyles({
  column: {
    display: "flex",
    columnGap: "15px",
    // margin: '30px auto',
    width: "100%",
    // overflowY: "scroll",
    gap: "8px",
  },
});

const BoardView = (props) => {
  const { boards, handleMove } = props;
  const classes = useStyles();
  const [list, setList] = useState(["Item 1", "Item 2", "Item 3"]);

  const [columns, setColumns] = useState({});

  useEffect(() => {
    const initialColumns = {};

    boards?.map((board, key) => {
      initialColumns[board.title] = {
        // id: board.title.replace(" ", "_"),
        id: board.title,
        list: board.cards,
        catalogId: board.id,
      };
    });

    setColumns(initialColumns);
  }, [boards]);

  /**
   *
   * NOTE: Flow: client event -> request api -> update UI when done
   */
  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // If the source and destination columns are the same
    // AND if the index is the same, the item isn't moving
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );
      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);
      // Call backend
      try {
        handleMove({
          cardId: start.list[source.index].id,
          from: start.catalogId,
          to: start.catalogId,
          position: destination.index,
        });
      } catch (error) {
        console.log(error);
        return;
      }

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
        catalogId: start.catalogId,
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
        catalogId: start.catalogId,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Call backend
      try {
        handleMove({
          cardId: start.list[source.index].id,
          from: start.catalogId,
          to: end.catalogId,
          position: destination.index,
        });
      } catch (error) {
        console.log(error);
        return;
      }

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
        catalogId: end.catalogId,
      };

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);
      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div className={classes.column}>
          {Object.values(columns).map((col) => (
            <Column col={col} key={col.id} />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default BoardView;
