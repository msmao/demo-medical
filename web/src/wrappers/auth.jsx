import { Redirect } from 'umi'

export default (props) => {
  const authority = JSON.parse(localStorage.getItem('authority') || '{}')
  
  if (authority.isLogin) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
}