export default function DisconnectedContainer() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col space-y-4">
      <img
        src="/disconnected-session.png"
        width={256}
        height={256}
        alt="Disconnected-korlas"
      />
      <h2 className="text-2xl text-[#FF2C5C]">Oops! You’ve Been Disconnected</h2>
      <p className="text-white/80 w-[400px] text-center leading-normal">
        This session was closed because you have another session open. We
        suggest returning to the most recent tab or refreshing this page.
      </p>
    </div>
  );
}
