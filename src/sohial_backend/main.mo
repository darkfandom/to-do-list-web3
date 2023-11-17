import Text "mo:base/Text";
import List "mo:base/List";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";

actor {

  public type Note = {
    textarea : Text;
    id : Nat;
  };

  var notes : List.List<Note> = List.nil<Note>();

  public func addTodo(title : Text) : async Nat {
    let todoId = List.size(notes) +1;

    let newNote : Note = {
      id = todoId;
      textarea = title;
    };

    notes := List.push(newNote, notes);
    Debug.print(debug_show (notes));

    return newNote.id;
  };

  public query func getAllTodo() : async [Note] {
    return List.toArray(notes);

  };

  public func deleteTodo(id : Nat) {
    Debug.print(debug_show (id));

    notes := List.filter(
      notes,
      func(note : Note) : Bool {
        return note.id != id;
      },
    );

    Debug.print("id is deleted");
  };

};
