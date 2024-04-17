import { memo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';

import IconSvg from '@/components/IconSvg';
import { useAppDispatch, useAppSelector } from '@/stores';
import { fetchUserMessage, userSelector } from '@/stores/features/userSlice';
// import { unwrapResult } from '@reduxjs/toolkit';

export default memo(() => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  // const [ userMessage, setUserMessage ] = useState(0);

  // const getUser = async () => {
  //   const resultAction = await dispatch(fetchUserMessage());
  //   const user = unwrapResult(resultAction);
  //   userMessage = user.msg;
  // }

  const getUser = useCallback(async () => {
    // const resultAction = await dispatch(fetchUserMessage());
    // const user = unwrapResult(resultAction);
    // setUserMessage(user.msg);
    await dispatch(fetchUserMessage());
  }, [dispatch])

  useEffect(() => {
    getUser();
  }, [])

  return (
    <Link to={'/'} className='universallayout-top-message'>
      <IconSvg name='message' />
      <Badge className='universallayout-top-message-badge' count={user.msg} size='small' />
    </Link>
  );
});
