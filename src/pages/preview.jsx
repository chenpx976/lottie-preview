import React, { Component } from 'react';
import Link from 'umi/link';
import { Icon, Button } from 'antd';
import './preview.less';
class preview extends Component {
  render() {
    return (
      <div className="preview">
        <div className="header">
          <div className="icon-close">
            <Link to="/"><Icon type="close" /></Link>
          </div>
          <div className="icon-fullscreen">
            <Icon type="eye" />
          </div>
        </div>
        <div className="lottie-body">
        </div>
        <div className="lottie-controller">
          <div className="action-btn">
            <Button className="action">
              border
            </Button>
            <Button className="action">
              background
            </Button>
            <Button className="action">
              Trim
            </Button>
            <Button className="action">
              Scale
            </Button>
            <Button className="action">
              Speed
            </Button>
            <Button className="action">
              ShowKeyPaths
            </Button>
            <Button className="action">
              RenderGraph
            </Button>
            <Button className="action">
              Lint
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default preview;