// prettier-ignore
import {  Button,  Flex,  FormLabel,  Input,  InputGroup,  InputLeftElement,  Menu,  MenuButton,  MenuItem,  MenuList, Text, useColorMode, useColorModeValue,} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  useDisclosure,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import { FaChevronDown } from "react-icons/fa";
import { categories } from "../data";
// prettier-ignore
import {  IoCheckmark,  IoClose,  IoCloudUpload,  IoLocation,  IoTrash,  IoWarning,} from "react-icons/io5";
import Spinner from "./Spinner";

import { firebaseApp } from "../firebase-config";
// prettier-ignore
import { getStorage,  ref,  uploadBytesResumable,  getDownloadURL,  deleteObject,} from "firebase/storage";
import { collection, setDoc, getFirestore, doc } from "firebase/firestore";
import AlertMsg from "./AlertMsg";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../utils/fetchUser";

const Create = () => {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.900", "gray.50");
  const [videoAsset, setVideoAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const editorRef = useRef(null);
  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertIcon, setAlertIcon] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Choose a category");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const storage = getStorage(firebaseApp);

  const navigate = useNavigate();

  const [userInfo] = fetchUser();

  useEffect(() => {}, [title, location, category, description]);

  const uploadImage = (e) => {
    setLoading(true);
    const videoFile = e.target.files[0];
    const storageRef = ref(storage, `Videos/${Date.now()}-${videoFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log({ error });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setVideoAsset(url);
          setLoading(false);
          setAlert(true);
          setAlertStatus("success");
          setAlertIcon(<IoCheckmark fontSize={25} />);
          setAlertMsg("Your Video uploaded successfully");
          setTimeout(() => {
            setAlert(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    const deleteRef = ref(storage, videoAsset);
    deleteObject(deleteRef)
      .then(() => {
        setVideoAsset(null);
        setAlert(true);
        setAlertStatus("error");
        setAlertIcon(<IoWarning fontSize={25} />);
        setAlertMsg("Your Video was Removed");
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDescriptionValue = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setDescription(editorRef.current.getContent());
    }
  };

  const uploadDetails = async () => {
    try {
      setLoading(true);
      if (!title && !category & !videoAsset) {
        setAlert(true);
        setAlertStatus("error");
        setAlertIcon(<IoWarning fontSize={25} />);
        setAlertMsg("Required Fields are missing!");
        setTimeout(() => {
          setAlert(false);
        }, 4000);
        setLoading(false);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          userId: userInfo?.uid,
          category: category,
          location: location,
          videoUrl: videoAsset,
          description: description,
          likes: [],
        };
        await setDoc(doc(fireStoreDb, "videos", `${Date.now()}`), data);
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fireStoreDb = getFirestore(firebaseApp);

  return (
    <>
      <div style={{ position: "absolute", top: "5.6em" }}>
        <div style={{ border: "3px solid #3BA3CD", borderRadius: "10px" }}>
          <Button onClick={onOpen} className="btnnnnn">
            Important Message For all Users
          </Button>
        </div>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>Important Note 📔 </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Hello Guys How are You Hope You all Good Guys If You Upload any
              type of video So Write Your location Where You Live Thankyou 💖
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                colorScheme="red"
                style={{ border: "none" }}
              >
                Close
              </Button>
              {/* <Button colorScheme="red" ml={3}>
                Yes
              </Button> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        width="100vw"
        minHeight={"100vh"}
        padding="10"
      >
        <Flex
          width={"80vw"}
          height={"full"}
          borderColor={"gray.300"}
          border={"4px solid #3BA3CD "}
          borderRadius={"md"}
          p={"4"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"2"}
        >
          {alert && (
            <AlertMsg status={alertStatus} msg={alertMsg} icon={alertIcon} />
          )}
          <Input
            variant="flushed"
            placeholder="Title"
            focusBorderColor={"gray.400"}
            isRequired
            errorBorderColor={"red"}
            type="text"
            _placeholder={{ color: "#3BA3CD" }}
            fontSize={20}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Flex
            justifyContent={"space-between"}
            width="full"
            alignItems={"center"}
            gap={8}
            my={4}
          >
            <Menu>
              {/* <MenuButton
              as={Button}
              rightIcon={<FaChevronDown fontSize={15} />}
              width="full"
              colorScheme="blue"
            >
              {category}
            </MenuButton> */}
              {/* <MenuList zIndex={101} width={"md"} shadow="xl">
              {categories &&
                categories.map((data) => (
                  <MenuItem
                    key={data.id}
                    _hover={{ bg: "blackAlpha.300" }}
                    fontSize={20}
                    px={4}
                    onClick={() => setCategory(data.name)}
                  >
                    {data.iconSrc} <Text ml={4}>{data.name}</Text>
                  </MenuItem>
                ))}
            </MenuList> */}
            </Menu>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={
                  <IoLocation
                    color="#3BA3CD "
                    fontSize={20}
                    color={`${colorMode == "dark" ? "#f1f1f1" : "#111"}`}
                  />
                }
              />
              <Input
                variant="flushed"
                placeholder="Location"
                focusBorderColor={"#3BA3CD"}
                isRequired
                errorBorderColor={"red"}
                type="text"
                _placeholder={{ color: "#3BA3CD" }}
                fontSize={20}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </InputGroup>
          </Flex>
          <Flex
            borderColor={"#3BA3CD"}
            height="400px"
            borderStyle={"dashed"}
            width={"full"}
            borderRadius={"md"}
            overflow="hidden"
            position={"relative"}
          >
            {!videoAsset ? (
              <FormLabel width={"full"}>
                <Flex
                  direction={"column"}
                  alignItems="center"
                  justifyContent={"center"}
                  height="full"
                  width={"full"}
                >
                  <Flex
                    direction={"column"}
                    alignItems="center"
                    justifyContent={"center"}
                    cursor="pointer"
                    height="full"
                    width={"full"}
                  >
                    {loading ? (
                      <Spinner progress={progress} />
                    ) : (
                      <>
                        <IoCloudUpload
                          fontSize={30}
                          color={`${colorMode == "dark" ? "#f1f1f1" : "#111"}`}
                        />
                        <Text mt={5} fontSize={20} color={textColor}>
                          Click to{" "}
                          <span style={{ color: "#3BA3CD" }}>upload</span>
                        </Text>
                      </>
                    )}
                  </Flex>
                </Flex>
                {!loading && (
                  <input
                    type="file"
                    name="upload-image"
                    onChange={uploadImage}
                    style={{ width: 0, height: 0 }}
                    // accept="video/mp4,video/x-m4v,video/*"
                  />
                )}
              </FormLabel>
            ) : (
              <Flex
                width={"full"}
                height="full"
                justifyContent={"center"}
                alignItems={"center"}
                bg="black"
                position={"relative"}
              >
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={"40px"}
                  height={"40px"}
                  rounded="full"
                  bg={"red"}
                  top={5}
                  right={5}
                  position={"absolute"}
                  cursor={"pointer"}
                  zIndex={10}
                  onClick={deleteImage}
                >
                  <IoTrash fontSize={20} color="white" />
                </Flex>
                <video
                  src={videoAsset}
                  controls
                  style={{ width: "100%", height: "100%" }}
                />
              </Flex>
            )}
          </Flex>
          <Editor
            onChange={getDescriptionValue}
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey={
              process.env.lztgaljfztq1ypleau89plu2t9qf3zyjd6w6ka8cvnjkgdwd
            }
            init={{
              height: 500,
              width: "100%",
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              content_css: "dark",
              // skin: "oxide-dark",
            }}
          />
          <Button
            isLoading={loading}
            loadingText="uploading"
            colorScheme="linkedin"
            variant={`${loading ? "outline" : "solid"}`}
            _hover={{ shadow: "lg" }}
            fontSize={20}
            onClick={() => uploadDetails()}
          >
            Upload
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Create;
