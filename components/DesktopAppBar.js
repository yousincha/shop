import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useLogout from "../hooks/useLogout"; // Import useAuth

const DesktopAppBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가
  const {
    logoutDialogOpen,
    handleLogoutDialogOpen,
    handleLogoutDialogClose,
    handleLogout,
  } = useLogout(); // 커스텀 훅 사용

  useEffect(() => {
    const handleLoginStatusChange = () => {
      const loginInfo = localStorage.getItem("loginInfo");
      if (loginInfo) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    // 컴포넌트 마운트 시 초기 로그인 상태 확인
    handleLoginStatusChange();

    window.addEventListener("loginStatusChanged", handleLoginStatusChange);

    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginStatusChange);
    };
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#333" }}>
      <Toolbar>
        <Link href="/" passHref>
          <Typography
            variant="h6"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src="/cart.png" alt="logo" width="30" />
          </Typography>
        </Link>
        <div style={{ flexGrow: 1 }} />
        {/* <Link href="/carts" passHref>
          <Button color="inherit">카트</Button>
        </Link> */}
        <Link href="/products" passHref>
          <Button color="inherit" style={{ color: "white" }}>
            상품목록
          </Button>
        </Link>
        <Link href="/cartItems" passHref>
          <Button color="inherit" style={{ color: "white" }}>
            장바구니
          </Button>
        </Link>
        <Link href="/mypage" passHref>
          <Button
            color="inherit"
            style={{ color: "white", display: isLoggedIn ? "block" : "none" }}
          >
            MyPage
          </Button>
        </Link>
        <Link href="/login" passHref>
          <Button
            color="inherit"
            style={{ color: "white", display: isLoggedIn ? "none" : "block" }}
          >
            로그인
          </Button>
        </Link>
        <Button
          color="inherit"
          style={{ color: "white", display: isLoggedIn ? "block" : "none" }}
          onClick={handleLogoutDialogOpen}
        >
          로그아웃
        </Button>

        <Dialog
          open={logoutDialogOpen}
          onClose={handleLogoutDialogClose}
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
        >
          <DialogTitle id="logout-dialog-title">로그아웃</DialogTitle>
          <DialogContent>
            <DialogContentText id="logout-dialog-description">
              로그아웃하시겠습니까?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLogoutDialogClose} color="primary">
              취소
            </Button>
            <Button onClick={handleLogout} color="primary" autoFocus>
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default DesktopAppBar;
