import React from "react";
import Avatar from "@mui/material/Avatar";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const members = [
  "Menaal Bloom",
  "Sam Donald",
  "Celyn Nash",
  "Cecelia Patterson",
  "Weronika Horne",
  "Johnathan Erickson",
  "Mia Freeman",
  "Yu Plant",
  "Dixie Tillman",
  "Hetty Cunningham",
  "Abida Grant",
  "Emelie Sharp",
  "Aysha Delarosa",
  "Lilith Mclean",
  "Christie Bentley",
  "Maverick Foley",
  "Nana Mcintosh",
  "Jamila Lam",
  "Missy Schwartz",
  "Susanna Gross",
  "Everett Burks",
  "Sade Neal",
  "Oliver Williamson",
  "Marius Marquez",
  "Janelle Silva",
  "Habib Devine",
  "Cain Arnold",
  "Lewys Swan",
  "Cade Ferry",
  "Rory Watt",
];

function AvatarList() {
  return (
    <ImageList sx={{ width: 1000, height: 500 }} cols={9} rowHeight={50}>
      {members.map((item) => (
        <ImageListItem key={item}>
          <Avatar alt={item} src="#" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default AvatarList;
