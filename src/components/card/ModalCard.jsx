/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
// @components
import MemberPopover from "../popover/card/MemberPopover";
import ChecklistPopover from "../popover/card/ChecklistPopover";
import AttachmentPopover from "../popover/card/AttachmentPopover";
import SimpleImage from "../upload/SimpleImage";
// @mui/icons-material
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
// redux
import { connect } from "react-redux";
import { updateCard, getCardById } from "../../store/actions/card";
import Checklist from "../checklist/Checklist";

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
    marginBottom: "15px !important",
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
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxWidth: "300px",
    marginBottom: "5px",
  },
  cardTitle: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  description: {
    margin: "0px 0px 20px 30px",
    fontStyle: "italic",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

const ModalCard = (props) => {
  const { open, handleClose } = props;
  const classes = useStyles();
  const [catalogName, setCatalogName] = useState("");
  const [isEditDescription, setIsEditDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (props.card.id != null) {
      props.getCardById(props.card.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.renderCard]);

  useEffect(() => {
    if (props.card.catalogId != null) {
      const catalogId = props.card.catalogId;
      const catalog = props.board.catalogs.filter(
        (cat) => cat.id === catalogId
      )[0];
      setCatalogName(catalog.title);
      setDescription(props.card.description);
      if (props.card.description === "") {
        setIsEditDescription(true);
      }
      setTitle(props.card.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.card]);

  // popover
  const initialPopoverState = {
    members: null,
    labels: null,
    checklist: null,
    attachment: null,
  };
  const [anchorEl, setAnchorEl] = useState(initialPopoverState);

  // event handler
  const handleChange = (event) => {
    setDescription(event.target.value);
  };

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

  // Image Upload
  const [openImage, setOpenImage] = useState("");

  const handleOpenImage = (image) => {
    setOpenImage(image);
  };

  const handleCloseImage = () => {
    setOpenImage("");
  };

  // const handleRemove = () => {
  //   setUrl(null);
  //   if (props.onChange) props.onChange(null);
  //   fileInput.current.value = null;
  // };

  // Update card
  const handleSubmit = () => {
    const data = {
      id: props.card.id,
      title: title,
      description: description,
      attachments: props.attachments,
      checklists: props.card.checklists.map((c) => c.id) || [],
    };
    props.updateCard(data);
    handleClose();
  };

  const handleCancleSubmit = () => {
    handleClose();
  };

  // Edit card Title
  const handleEditTitle = () => {
    setIsEditTitle(true);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  // Edit description
  const handleClickEditDescription = () => {
    setIsEditDescription(true);
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
            {isEditTitle === true ? (
              <div>
                <TextField
                  id="outlined-multiline-static"
                  className={classes.addTextArea}
                  fullWidth
                  defaultValue={title}
                  onChange={handleChangeTitle}
                />
                <Button onClick={() => setIsEditTitle(false)}>Save</Button>
              </div>
            ) : (
              <Typography
                onClick={handleEditTitle}
                id="modal-modal-title"
                variant="h6"
                component="h2"
                classes={{
                  root: classes.cardTitle,
                }}
              >
                {title}
              </Typography>
            )}
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
              {isEditDescription === true || description === "" ? (
                <>
                  <TextField
                    id="outlined-multiline-static"
                    className={classes.addTextArea}
                    multiline
                    rows={3}
                    fullWidth
                    defaultValue={description}
                    placeholder="Add a more detailed description..."
                    onChange={handleChange}
                  />
                  <Button onClick={() => setIsEditDescription(false)}>
                    Save
                  </Button>
                </>
              ) : (
                <div
                  onClick={handleClickEditDescription}
                  className={classes.description}
                >
                  {description}
                </div>
              )}
              {/* Checklist Container */}
              <div>
                {props.checklists?.map((checklist, cKey) => (
                  <Checklist key={cKey} checklist={checklist} />
                ))}
              </div>

              {/* Image Container */}
              <div>
                {props.attachments?.map((file, imageKey) => (
                  <div className={classes.imageWrapper} key={imageKey}>
                    <img
                      className={classes.image}
                      src={file}
                      alt="thumbnail-image"
                    />
                    <IconButton onClick={() => handleOpenImage(file)}>
                      <VisibilityIcon />
                    </IconButton>
                    <SimpleImage
                      open={file === openImage}
                      onClose={() => handleCloseImage(file)}
                      url={file}
                    />
                  </div>
                ))}
              </div>
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
          <div>
            <Button color="warning" onClick={handleCancleSubmit}>
              Cancel
            </Button>
            <Button color="success" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ board, card }) => ({
  board: board.board.data,
  card: card.card,
  attachments: card.card.attachments,
  checklists: card.card.checklists,
  renderCard: card.renderCard,
});

const mapDispatchToProps = {
  updateCard,
  getCardById,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCard);
