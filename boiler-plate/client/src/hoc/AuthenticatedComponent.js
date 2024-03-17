import React from 'react';
import withAuthCheck from './auth'; // 위에서 작성한 HOC 파일을 import 합니다.

// 인증이 필요한 컴포넌트
function MyAuthenticatedComponent(props) {
    return (
        <div>
        </div>
    );
}

// withAuthCheck를 사용하여 MyAuthenticatedComponent를 래핑합니다.
const AuthenticatedComponent = withAuthCheck(MyAuthenticatedComponent, true /* 인증이 필요함 */, false /* 관리자만 출입 가능 */);

export default AuthenticatedComponent;