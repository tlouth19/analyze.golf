import { Component, type ErrorInfo, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { connect, type MapDispatchToProps } from "react-redux";
import FocusLock from "react-focus-lock";

import { reset } from "@redux/slices/video";

interface ComponentProps {
  children?: ReactNode;
  reset: typeof reset;
}

interface State {
  hasError: boolean;
}

interface DispatchProps {
  reset: typeof reset;
}

class ErrorBoundary extends Component<ComponentProps, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReset = () => {
    this.props.reset();
  };

  render() {
    if (this.state.hasError) {
      return createPortal(
        <FocusLock>
          <div className="fixed inset-0 flex items-center justify-center z-[100000] bg-white dark:bg-black">
            <div className="text-center">
              <BsFillExclamationCircleFill className="text-4xl mb-2 mx-auto" />
              <h2 className="text-lg uppercase font-bold mb-4">
                An Error Occurred
              </h2>
              <button
                type="button"
                className="uppercase text-brand-blue font-semibold"
                onClick={this.handleReset}
              >
                Return Home
              </button>
            </div>
          </div>
        </FocusLock>,
        document.body
      );
    }

    return this.props.children;
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, ComponentProps> = {
  reset,
};

export default connect(null, mapDispatchToProps)(ErrorBoundary);
