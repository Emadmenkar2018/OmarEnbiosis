import React, { Component } from "react";

const withWindowDimensions = (WrappedComponent) => {
    return class extends Component {
        state = { width: 0, height: 0 };

        componentDidMount() {
            this.updateWindowDimensions();
            window.addEventListener("resize", this.updateWindowDimensions);
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.updateWindowDimensions);
        }

        updateWindowDimensions = () => {
            this.setState({ width: window.innerWidth, height: window.innerHeight });
        };

        render() {
            const {width, height} = this.state;
            return (
                <WrappedComponent
                    {...this.props}
                    windowWidth={width}
                    windowHeight={height}
                    isMobileSized={width < 700}
                />
            );
        }
    };
}

export default withWindowDimensions;