export default function AnimatedText({ text }: { text: string }) {
  return (
    <>
      <h1 className="text-center  font-mono font-semibold text-2xl -z-50 text-flicker-gradient mt-3  ">
        {text}
      </h1>
    </>
  );
}
