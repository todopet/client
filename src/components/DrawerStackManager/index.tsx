import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DrawerContext } from "@/libs/hooks/useDrawer";

type DrawerProps = {
  component: React.ReactNode;
  parameter: unknown;
  opened: boolean;
  title: string | React.ReactNode;
  onClose: (result?: unknown) => void;
  options?: {
    isTitleCentered?: boolean; // 제목을 중앙 정렬할지 여부
    isDrawerFullSize?: boolean; // Drawer가 전체 화면을 차지할지 여부
    closeOnClickOutside?: boolean; // Drawer 외부 클릭 시 닫힐지 여부
    isNotTitle?: boolean; // 제목을 표시하지 않을지 여부
  };
};

// Context and hook are defined in ./context to satisfy react-refresh rule

const TRANSITION_DURATION = 200;

const DrawerStackManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [drawerStack, setDrawerStack] = useState<DrawerProps[]>([]);
  const [openedStates, setOpenedStates] = useState<boolean[]>([]);
  const portalTarget = useMemo(() => (typeof document === "undefined" ? null : document.body), []);

  const drawerStackRef = useRef<DrawerProps[]>([]);
  useEffect(() => {
    drawerStackRef.current = drawerStack;
  }, [drawerStack]);

  const hasDrawer = drawerStack.length > 0;
  const topDrawer = drawerStack[drawerStack.length - 1];

  const openDrawer = (
    component: React.ReactNode,
    parameter: unknown,
    title: string | React.ReactNode,
    options?: {
      isTitleCentered?: boolean;
      isDrawerFullSize?: boolean;
      closeOnClickOutside?: boolean;
      isNotTitle?: boolean;
    }
  ): Promise<unknown> => {
    return new Promise<unknown>((resolve) => {
      const newDrawer: DrawerProps = {
        component,
        parameter,
        onClose: resolve,
        title,
        opened: false, // 1️⃣ 초기에는 닫힌 상태
        options,
      };

      // 2️⃣ Drawer 먼저 Stack에 추가
      setDrawerStack((prev) => [...prev, newDrawer]);
      setOpenedStates((prev) => [...prev, false]);

      // 3️⃣ 다음 렌더 타이밍에 opened=true로 변경 (자연스러운 transition 발생)
      requestAnimationFrame(() => {
        setOpenedStates((prev) => prev.map((v, i) => (i === prev.length - 1 ? true : v)));
      });
    });
  };

  const closeDrawer = useCallback((result?: unknown) => {
    const stack = drawerStackRef.current;
    const currentTopIndex = stack.length - 1;
    if (currentTopIndex < 0) return;

    setOpenedStates((prev) => prev.map((v, i) => (i === currentTopIndex ? false : v)));

    setTimeout(() => {
      const currentDrawer = stack[currentTopIndex];
      currentDrawer?.onClose?.(result);

      setDrawerStack((prev) => prev.slice(0, currentTopIndex));
      setOpenedStates((prev) => prev.slice(0, currentTopIndex));
    }, TRANSITION_DURATION);
  }, []);

  useEffect(() => {
    if (!hasDrawer) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [hasDrawer]);

  useEffect(() => {
    if (!hasDrawer) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const shouldClose = topDrawer?.options?.closeOnClickOutside ?? true;
        if (shouldClose) closeDrawer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasDrawer, topDrawer, closeDrawer]);

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      {children}
      {portalTarget &&
        drawerStack.map((drawerProps, index) => {
          const isOpen = openedStates[index];
          const isFull = drawerProps.options?.isDrawerFullSize ?? false;
          const closeOnClickOutside = drawerProps.options?.closeOnClickOutside ?? true;
          const zIndex = 1000 + index * 2;

          return createPortal(
            <div
              key={index}
              aria-modal="true"
              role="dialog"
              style={{
                position: "fixed",
                inset: 0,
                zIndex,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <div
                aria-hidden="true"
                onClick={() => {
                  if (closeOnClickOutside) closeDrawer();
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0, 0, 0, 0.45)",
                  opacity: isOpen ? 1 : 0,
                  transition: `opacity ${TRANSITION_DURATION}ms ease`,
                }}
              />
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: isFull ? "100%" : "720px",
                  height: isFull ? "100vh" : "auto",
                  maxHeight: isFull ? "100vh" : "90vh",
                  marginBottom: isFull ? "0" : "0.5rem",
                  transform: isOpen ? "translateY(0%)" : "translateY(100%)",
                  transition: `transform ${TRANSITION_DURATION}ms ease`,
                  background: "#ffffff",
                  color: "#111827",
                  borderTopLeftRadius: isFull ? "0" : "0.75rem",
                  borderTopRightRadius: isFull ? "0" : "0.75rem",
                  boxShadow: "0 -12px 32px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                {!drawerProps.options?.isNotTitle && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      width: "100%",
                      minHeight: isFull ? "3.5rem" : "3rem",
                      height: isFull ? "3.5rem" : "3.25rem",
                      padding: isFull
                        ? "1.125rem 1rem 1.125rem 1rem"
                        : "0.875rem 1.125rem 0.875rem 1.125rem",
                      borderBottom: "1px solid #e5e7eb",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        width: "100%",
                        color: "#111827",
                        height: isFull ? "1.25rem" : "1.5rem",
                        fontSize: isFull ? "1.25rem" : "1.125rem",
                        lineHeight: isFull ? "1.5625rem" : "1.25rem",
                        fontFamily: "MBK CorpoA",
                        textAlign: drawerProps.options?.isTitleCentered ? "center" : "start",
                      }}
                    >
                      {drawerProps.title}
                    </div>
                    <button
                      type="button"
                      aria-label="Close drawer"
                      onClick={() => closeDrawer()}
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        minWidth: "1.5rem",
                        minHeight: "1.5rem",
                        border: "none",
                        background: "transparent",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        lineHeight: 1,
                        cursor: "pointer",
                        color: "#111827",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      &times;
                    </button>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    padding: "0px",
                    width: "100%",
                    marginBottom: isFull ? "0rem" : "0.5rem",
                    overflow: "auto",
                  }}
                >
                  {drawerProps.component}
                </div>
              </div>
            </div>,
            portalTarget,
            `drawer-${index}`
          );
        })}
    </DrawerContext.Provider>
  );
};

export default DrawerStackManager;
