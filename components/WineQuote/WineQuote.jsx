import Rotation from "../Rotation/Rotation";
//
const DEFAULT_WINEQUOTES = [
  "::Paulo Koeljo:: Sva vina treba probati; neke treba samo pijuckati, ali sa drugima popiti celu flašu.",
  "::Martin Luter:: Pivo prave ljudi, vino Bog.",
  "::Napoleon Bonaparta:: U pobedi, zaslužujete šampanjac. U porazu vam treba.",
  "::Papa Jovan XXIII:: Ljudi su kao vino – neki postanu kao sirće, najbolji se poboljšavaju sa godinama.",
  "::Aleksandar Fleming:: Penicilin leči, ali vino čini ljude srećnim.",
  "::Rumi:: Ili mi daj još vina, ili me ostavi na miru.",
  "::Koko Šanel:: Šampanjac pijem samo u dva navrata, kada sam zaljubljena i kada nisam.",
  "::Bendžamin Frenklin:: U vinu je mudrost, u pivu je sloboda, u vodi su bakterije.",
  "::Tirion Lanister:: Pijem i znam stvari.",
];
const reWineQuotes = /^::(.*?)::\s*(.*)$/;
////
////
const WineQuote = ({ quotes = DEFAULT_WINEQUOTES }) => {
  return (
    <Rotation
      timeout={18}
      nodes={quotes.map((q) => ({
        key: q,
        node: (
          <QuoteSingle
            Q={((m) => ({ author: m[1], quote: m[2] }))(reWineQuotes.exec(q))}
          />
        ),
      }))}
    />
  );
};

function QuoteSingle({ Q }) {
  return (
    <figure className="text-right tracking-wide">
      <blockquote className="mt-2">
        <p className="!text-white/60">{Q.quote}</p>
      </blockquote>
      <figcaption>
        <cite>
          <strong className="text-red-700/60 pr-4">{Q.author}</strong>
        </cite>
      </figcaption>
    </figure>
  );
}

export default WineQuote;
