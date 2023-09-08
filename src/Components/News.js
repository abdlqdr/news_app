import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    // console.log('this is constructor from news component')
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsDaily`;
  }

  async newUpdate() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines? country=${this.props.country} &category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("parsedData:::  ", parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      
    });
    this.props.setProgress(100);

  }
  async componentDidMount() {
    this.newUpdate();
  }

  fetchMoreData = async () => {
    this.setState({
            page: this.state.page + 1,
          });
    const url = `https://newsapi.org/v2/top-headlines? country=${this.props.country} &category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("parsedData:::  ", parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };
  // console.log('this.state.articles',{articles})
  // handlePrevClick = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.newUpdate();
  // };
  // handleNextClick = async () => {
  //   if (
  //     !(
  //       this.state.page + 1 >
  //       Math.ceil(this.state.totalResults / this.props.pageSize)
  //     )
  //   ) {
  //     
  //     this.newUpdate();
  //   }
  // };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "40px,0px" }}>
          NewsDaily - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((element, i) => (
                <div className="col-md-4" key={i + element.url}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 30) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
