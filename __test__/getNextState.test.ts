import { getNextState } from "../src/getNextState";

describe("getNextState", () => {
    it("get next state after initial request", () => {
        getNextState({ body: { session: { used_id: 1, new: true }}});
        const
            nextState = getNextState({ body: { session: { used_id: 1, new: false }, request: { original_utterance: "Кремль"}}});
        expect(nextState).not.toBeUndefined();
    })
})