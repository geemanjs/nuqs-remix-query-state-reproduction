import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useQueryStates, createSerializer, parseAsStringLiteral } from "nuqs";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const tabs = ["a", "b", "c", "d"] as const;

const params = {
  tab: parseAsStringLiteral(tabs).withDefault("a"),
  filters: parseAsStringLiteral(["1", "2", "3"]).withDefault("1"),
};

function useNuqsState() {
  return useQueryStates(params);
}

function useNuqsSerializer() {
  return createSerializer(params);
}

export default function Index() {
  const [nuqsState, setNuqsState] = useNuqsState();
  const serialize = useNuqsSerializer();
  return (
    <div className="flex flex-col gap-8 h-screen items-center justify-center">
      <div>
        <Link
          to={{ search: serialize({ ...nuqsState, tab: "a" }) }}
          aria-current={nuqsState.tab === "a" ? "page" : undefined}
          className="aria-[current=page]:bg-blue-300 hover:bg-slate-50 p-4 rounded"
        >
          A
        </Link>
        <Link
          to={{ search: serialize({ ...nuqsState, tab: "b" }) }}
          aria-current={nuqsState.tab === "b" ? "page" : undefined}
          className="aria-[current=page]:bg-blue-300 hover:bg-slate-50 p-4 rounded"
        >
          B
        </Link>
        <Link
          to={{ search: serialize({ ...nuqsState, tab: "c" }) }}
          aria-current={nuqsState.tab === "c" ? "page" : undefined}
          className="aria-[current=page]:bg-blue-300 hover:bg-slate-50 p-4 rounded"
        >
          C
        </Link>
        <Link
          to={{ search: serialize({ ...nuqsState, tab: "d" }) }}
          aria-current={nuqsState.tab === "d" ? "page" : undefined}
          className="aria-[current=page]:bg-blue-300 hover:bg-slate-50 p-4 rounded"
        >
          D
        </Link>
      </div>
      <div>
        <button
          aria-current={nuqsState.filters === "1" ? "page" : undefined}
          className="aria-[current=page]:bg-teal-300 hover:bg-slate-50 p-4 rounded"
          onClick={() => {
            setNuqsState((prev) => ({ ...prev, filters: "1" }));
          }}
        >
          1
        </button>
        <button
          aria-current={nuqsState.filters === "2" ? "page" : undefined}
          className="aria-[current=page]:bg-teal-300 hover:bg-slate-50 p-4 rounded"
          onClick={() => {
            setNuqsState((prev) => ({ ...prev, filters: "2" }));
          }}
        >
          2
        </button>
        <button
          aria-current={nuqsState.filters === "3" ? "page" : undefined}
          className="aria-[current=page]:bg-teal-300 hover:bg-slate-50 p-4 rounded"
          onClick={() => {
            setNuqsState((prev) => {
              return { ...prev, filters: "3" };
            });
          }}
        >
          3
        </button>
      </div>
    </div>
  );
}
