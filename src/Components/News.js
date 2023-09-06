import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";

export class News extends Component {
    
    constructor(){
        super();
        // console.log('this is constructor from news component')
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount(){
        let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=771456111ba149f288b976ada436749a&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults, loading:false})
        console.log('parsedData::  ',parsedData)
    }
    
    handlePrevClick = async () => {
        console.log('prev clicked')
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=771456111ba149f288b976ada436749a&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json()

         this.setState({
            page: this.state.page-1,
            articles: parsedData.articles,
            loading:false
         })
    }
    handleNextClick = async () => {
        console.log('next clicked')
        if (!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=771456111ba149f288b976ada436749a&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
            this.setState({loading:true})
            let data = await fetch(url);
            let parsedData = await data.json()
             this.setState({
                page: this.state.page+1,
                articles: parsedData.articles,
                loading:false
             })
        }
    }
  render() {
    return (
      <div className="container my-3">
        <h2>Godi Media - Top Godi Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading  ? this.state.articles.map((element)=>{
            return(<div className="col-md-4" key={element.url}>
            <Newsitem title={element.title?element.title.slice(0,30):''} description={element.description?element.description.slice(0,80):''} imgUrl={element.urlToImage} newsUrl= {element.url}/>
          </div>)
        }):<></>}

        </div>
        <div className=" d-flex justify-content-between">

        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Prev</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark mx-3" onClick={this.handleNextClick}>Next &raquo;</button>
        </div>
      </div>
    );
  }
}

export default News;
