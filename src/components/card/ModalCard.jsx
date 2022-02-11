import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
// @mui/icons-material
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
// redux
import { connect } from "react-redux";
import MemberPopover from "../popover/card/MemberPopover";
import ChecklistPopover from "../popover/card/ChecklistPopover";
import AttachmentPopover from "../popover/card/AttachmentPopover";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 720,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles({
  headerContainer: {
    display: "flex",
    alignItems: "center",
    columnGap: "10px",
    marginBottom: "5px",
  },
  emText: {
    margin: "0px 0px 20px 30px",
    fontStyle: "italic",
  },
  addTextArea: {
    // margin: "0px 5px 5px 30px !important",
    border: "none",
    background: "#fff",
    borderRadius: "10px",
    width: "500px !important",
    "&:hover": {
      border: "0px !important",
    },
    "&:focus": {
      border: "none !important",
    },
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toolbarWrapper: {
    width: "200px",
  },
  addToCardText: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: "10px",
  },
  toolbarBtn: {
    textTransform: "none !important",
    justifyContent: "flex-start !important",
    fontSize: "14px !important",
    borderRadius: "6px !important",
    padding: "11px !important",
    paddingLeft: "15px !imporatant",
    background: "#EAEAEE !important",
    color: "black !important",
    margin: "5px 0px 5px 0px !important",
  },
});

const ModalCard = (props) => {
  const { card, open, handleClose } = props;
  const classes = useStyles();
  const [catalogName, setCatalogName] = useState("");

  useEffect(() => {
    const catalogId = card.catalogId;
    const catalog = props.board.catalogs.filter(
      (cat) => cat.id === catalogId
    )[0];
    setCatalogName(catalog.title);
  }, [card]);

  // popover
  const initialPopoverState = {
    members: null,
    labels: null,
    checklist: null,
    attachment: null,
  };
  const [anchorEl, setAnchorEl] = useState(initialPopoverState);

  // event handler
  const handleChange = (event) => {};

  const handlePopoverClick = (event) => {
    const newState = {
      ...initialPopoverState,
      [event.target.name]: event.currentTarget,
    };
    setAnchorEl(newState);
  };

  const handlePopoverClose = () => {
    setAnchorEl(initialPopoverState);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={classes.headerContainer}>
            <CreditCardIcon />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {card.title}
            </Typography>
          </div>
          <div className={classes.emText}>in catalog {catalogName}</div>
          <div className={classes.contentWrapper}>
            <section>
              <div className={classes.headerContainer}>
                <DescriptionIcon />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Description
                </Typography>
              </div>
              <TextField
                id="outlined-multiline-static"
                className={classes.addTextArea}
                multiline
                rows={3}
                fullWidth
                defaultValue={card.description}
                placeholder="Add a more detailed description..."
                onChange={handleChange}
              />
            </section>
            <section className={classes.toolbarWrapper}>
              <div className={classes.addToCardText}>Add to card</div>
              {/* button wrapper */}
              <div>
                <Button
                  classes={{
                    root: classes.toolbarBtn,
                  }}
                  startIcon={<PersonOutlineOutlinedIcon />}
                  fullWidth
                  onClick={handlePopoverClick}
                  name="members"
                >
                  Members
                </Button>
                <MemberPopover
                  anchorEl={anchorEl.members}
                  handleClose={handlePopoverClose}
                />
                <Button
                  classes={{
                    root: classes.toolbarBtn,
                  }}
                  startIcon={<LocalOfferOutlinedIcon />}
                  fullWidth
                  onClick={handlePopoverClick}
                  name="labels"
                >
                  Labels
                </Button>
                <Button
                  classes={{
                    root: classes.toolbarBtn,
                  }}
                  startIcon={<CheckBoxOutlinedIcon />}
                  fullWidth
                  onClick={handlePopoverClick}
                  name="checklist"
                >
                  Checklist
                </Button>
                <ChecklistPopover
                  anchorEl={anchorEl.checklist}
                  handleClose={handlePopoverClose}
                />
                <Button
                  classes={{
                    root: classes.toolbarBtn,
                  }}
                  startIcon={<AttachmentOutlinedIcon />}
                  fullWidth
                  onClick={handlePopoverClick}
                  name="attachment"
                >
                  Attachment
                </Button>
                <AttachmentPopover
                  anchorEl={anchorEl.attachment}
                  handleClose={handlePopoverClose}
                />
              </div>
            </section>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ board }) => ({
  board: board.board.data,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCard);
