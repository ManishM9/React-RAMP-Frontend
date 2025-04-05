import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [flagData, setFlagData] = useState("");
  const [dispFlagData, setDispFlagData] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(
      "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/747265"
    )
      .then((res) => res.text())
      .then((resFlagData) => {
        setFlagData(resFlagData);
        setLoading(false);
        console.log(resFlagData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!loading && flagData.length > 0) {
      if (index === flagData.length) {
        return;
      }
      setTimeout(() => {
        setDispFlagData((prev) => prev + flagData[index]);
        setIndex((prev) => prev + 1);
      }, 500);
    }
  }, [loading, index]);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <ul>
      {dispFlagData.split("").map((ch, i) => (
        <li key={i}>{ch}</li>
      ))}
    </ul>
  );
}

// Code for STEP 2:
// Used Node with cheerio for imitating scraping from the downloaded .html file.
/*
const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');



const sectRegEx = /^92.*$/;
const artiRegEx = /^.*45$/;
const divRegEx = /^.*78.*$/;

let answer = "";

function parseE(ele) {
    const tagName = ele.tagName;
    const attributes = ele.attribs;

    if (tagName === "section" && sectRegEx.test(attributes['data-id'])) {
        ele.children.forEach(child => {
            if (child.type === 'tag') {
                parseE(child);
            }
        });
    } else if (tagName === "article" && artiRegEx.test(attributes['data-class'])) {
        ele.children.forEach(child => {
            if (child.type === 'tag') {
                parseE(child);
            }
        });
    } else if (tagName === "div" && divRegEx.test(attributes['data-tag'])) {
        ele.children.forEach(child => {
            if (child.type === 'tag') {
                parseE(child);
            }
        });
    } else if (tagName === "b" && attributes['class']==="ramp ref") {
        answer = answer + attributes.value;
    } else if (tagName === "body") {
        ele.children.forEach(child => {
            if (child.type === 'tag') {
                parseE(child);
            }
        });
    }
}

const filePath = path.join(__dirname, 'rampfec.html');
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const $ = cheerio.load(data);

    const body = $('body');

    if (body.length) {
        body.each((ind, ele) => {
            parseE(ele);
        });
    } else {
        console.log("No body tag found.");
    }
    console.log(answer);
});
*/
