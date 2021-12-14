// home page (displays categories)
//all images need to be resized and links pointed to routers when completed

import React from "react";
import accTile from "./images/accTile.jpeg";
import bandTile from "./images/bandTile.jpeg";
import clusterTile from "./images/clusterTile.jpeg";
import drumTile from "./images/drumTile.jpeg";
import guitarTile from "./images/guitarTile.jpeg";
import keysTile from "./images/keysTile.jpeg";

const Home = () => {
    return (
        <>
          <div className="homepage">
              <h1 className="hometitle">Welcome to KamJam</h1>
              <span className="rowOne">
                {/* replace test links below */}
                {/* guitars */}
                <a href="/guitars/products">
                <img src={guitarTile} className="homepageTiles" row="rowOne"/>
                </a>
                {/* drums */}
                <a href="/drums/products">
                <img src={drumTile} className="homepageTiles" row="rowOne"/>
                </a>
                {/* Band and orchestra */}
                <a href="/band/products">
                <img src={bandTile} className="homepageTiles" row="rowOne"/>
                </a>
              </span>
              <span class="rowTwo">
                {/* keys and synths */}
                <a href="/keyboards/products">
                <img src={keysTile} className="homepageTiles" row="rowTwo"/>
                </a>
                {/* Accesories */}
                <a href="/accessories/products">
                  <img src={accTile} className="homepageTiles" row="rowTwo"/>
                </a>
                {/* all products */}
                <a href="/products">
                <img src={clusterTile} className="homepageTiles" row="rowTwo"/>
                </a>
              </span>
          </div>
        </>
    );
};

export default Home;