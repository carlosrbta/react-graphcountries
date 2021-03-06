import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Countries from "./pages/Countries";
import Country from "./pages/Country";
import CountryEdit from "./pages/CountryEdit";
import { Layout } from "antd";
import "./App.scss";

const { Header, Footer, Content } = Layout;

const App = () => {
  return (
    <HashRouter basename="/">
      <Layout>
        <Header>
          React - Graph countries
          <a
            href="https://github.com/lennertVanSever/graphcountries"
            target="_BLANK"
            rel="noopener noreferrer"
            className="header-docs"
          >
            docs
          </a>
        </Header>
        <Content>
          <Switch>
            <Route path="/" exact={true} component={Countries} />
            <Route path="/:name" exact component={Country} />
            <Route path="/:name/edit" component={CountryEdit} />
          </Switch>
        </Content>
        <Footer>
          © Copyright 2020{" "}
          <a
            href="https://github.com/carlosrbta"
            target="_BLANK"
            rel="noopener noreferrer"
          >
            @carlosrbta
          </a>
          . All rights reserved.
        </Footer>
      </Layout>
    </HashRouter>
  );
};

export default App;
