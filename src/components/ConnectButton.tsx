
"use client";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "radix-connect-button": React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >;
    }
  }
}




export default function ConnectButton() {


  return (
    <div>
      <radix-connect-button></radix-connect-button>
      <pre id="rola-result"></pre>
    </div>
  );
}
