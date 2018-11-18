// import styles from './index.css';
import Link from 'umi/link';
import TabBar from '../components/TabBar';
import './index.less';
export default function() {
  return (
    <div className="home">
      <div className="title">
        Preview
      </div>
      <div className="action-list">
        <div className="url">
          enter a url
          <Link to="/preview">去预览页面</Link>
        </div>
      </div>
      <TabBar />
    </div>
  );
}
