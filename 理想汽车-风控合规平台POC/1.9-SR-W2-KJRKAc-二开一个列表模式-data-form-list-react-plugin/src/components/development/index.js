import React, { useState, useEffect } from "react";
import "./development.less";
import { DesignConfiguration, Main } from "../index.js";
import { Carousel } from "antd";
import { mockCustomConfig, mockChangeCustomConfig } from "./mockData.js";
import Utils from "../../utils";
import { mainInit } from "../../App.js";
import MindElixir, { E } from "mind-elixir";
import uuid from "uuid/v4";
import NodeData from "./nodeData";

// const renderMap = [Main, DesignConfiguration];
let ME = null;

const Development = () => {
  console.log(mockCustomConfig);
  const [customConfig, setCustomConfig] = useState(mockCustomConfig);
  const changeCustomConfig = (customConfig) => {
    debugger;
    setCustomConfig(JSON.parse(customConfig));
    mockChangeCustomConfig(JSON.parse(customConfig));
  };

  // const [contextMenuOption, setContextMenuOption] = useState({
  //   focus: true,
  //   link: true,
  //   extend: [
  //     {
  //       name: "编辑",
  //       key: "",
  //       onclick: (e) => {
  //         console.log("shanchu", e, e.target.value);
  //         // window.location.href = "https://www.baidu.com/";
  //       },
  //     },
  //     {
  //       name: "删除",
  //       key: "",
  //       onclick: () => {
  //         alert("删除节点");
  //       },
  //     },
  //     {
  //       name: "详情",
  //       key: "",
  //       onclick: () => {
  //         alert("删除节点");
  //       },
  //     },
  //   ],
  // });
  useEffect(() => {
    ME = new MindElixir({
      el: "#map",
      direction: MindElixir.RIGHT,
      draggable: true, // default true
      contextMenu: true, // default true
      toolBar: false, // default true
      nodeMenu: true, // default true
      keypress: false, // default true
      overflowHidden: false, // default false
      primaryLinkStyle: 3, // [1,2] default 1
      primaryNodeVerticalGap: 25, // default 25
      primaryNodeHorizontalGap: 65, // default 65
      allowUndo: true,
      editable: true,
      contextMenuOption: {
        focus: true,
        link: true,
        extend: [
          {
            name: "新增",
            key: "",
            onclick: (e) => {
              console.log("shanchu", e, e.target.value);
            },
          },
          {
            name: "删除",
            key: "",
            onclick: () => {
              if (ME.currentNode?.nodeObj?.parent) {
                ME.removeNode();
              } else {
                alert("顶层模块无法删除！");
              }
            },
          },
          {
            name: "编辑",
            key: "",
            onclick: () => {
              alert("删除节点");
            },
          },
        ],
      },
    });
    window.ME = ME;
    window.ME.init(NodeData);

    // 选中节点回调
    window.ME.bus.addListener("selectNode", (node) => {
      console.log("selectNode", node);
      // window.ME.currentNode = undefined;
      // window.ME.direction = MindElixir.LEFT;
      // window.ME.contextMenuOption = {
      //   focus: true,
      //   link: true,
      //   extend: [
      //     {
      //       name: "新增11",
      //       key: "",
      //       onclick: (e) => {
      //         console.log("shanchu", e, e.target.value, node.id);
      //       },
      //     },
      //     {
      //       name: "删除",
      //       key: "",
      //       onclick: () => {
      //         if (ME.currentNode?.nodeObj?.parent) {
      //           ME.removeNode();
      //         } else {
      //           alert("顶层模块无法删除！");
      //         }
      //       },
      //     },
      //     {
      //       name: "编辑",
      //       key: "",
      //       onclick: () => {
      //         alert("删除节点");
      //       },
      //     },
      //   ],
      // };

      // 最后一级节点
      if (node?.children && node?.children.length !== 0) {
        document.querySelector("cmenu .menu-list").style.display = "none";
      } else {
        document.querySelector("cmenu .menu-list").style.display = "block";
      }
      // window.ME.init(NodeData);
    });

    console.log("did mount");
  });

  return (
    <div
      style={{ width: "100%", height: "100%", position: "relative" }}
      className="frame-box"
    >
      <div id="map"></div>
    </div>
  );
};

Development.propTypes = {};

export default Development;
