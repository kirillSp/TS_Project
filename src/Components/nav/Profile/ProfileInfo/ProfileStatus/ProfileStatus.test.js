import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Testing ProfileStatus compoenent", () => {
    test("status should be in the state", () => {
        let compoenent = create(<ProfileStatus status="Any status" />);
        let instance = compoenent.getInstance();

        expect(instance.state.status).toBe("Any status");
    });

    test("should be shown <p>", () => {
        let compoenent = create(<ProfileStatus status="Any status" />);
        let root = compoenent.root;
        let p = root.findByType("p");

        expect(p.type).toBe("p");
    });

    test("After creation <span>, correct text should be shown inside", () => {
        let compoenent = create(<ProfileStatus status="Any status" />);
        let root = compoenent.root;
        let p = root.findByType("p");

        expect(p.children[0]).toBe("Any status")
    });

    test("shouldn't be shown <p>", () => {
        let compoenent = create(<ProfileStatus status="Any status" />);
        let root = compoenent.root;
        
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });

    test("on double click, should be shown <input>", () => {
        let compoenent = create(<ProfileStatus status="Any status" />);
        let root = compoenent.root;
        let paragraph = root.findByType("p");
       
        paragraph.props.onDoubleClick();
       
        let input = root.findByType("input");

        expect(input.type).toBe("input");
    });

    test("with <input> shuld be shown valid text", () => {
        let compoenent = create(<ProfileStatus status="Any status" />);
        let root = compoenent.root;
        let paragraph = root.findByType("p");
       
        paragraph.props.onDoubleClick();
       
        let input = root.findByType("input");
        
        expect(input.props.value).toBe("Any status");
    });

    test("callback should be call", () => {
        let mockCallback = jest.fn()
        let component = create(<ProfileStatus status="Any status" updateStatus={mockCallback} />);
        let instance = component.getInstance();
        
        instance.deactivateEditMode();

        expect(mockCallback.mock.calls.length).toBe(1);
    });
});